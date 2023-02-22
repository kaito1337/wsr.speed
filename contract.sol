//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WSRSpeed is ERC20("CryptoMonster", "CMON") {
    address owner;
    address privateProvider = 0xd335eEDDa6D85ae0Edf670daA126d3Dae32b2df8;
    address publicProvider = 0xE0FbeF2d04312289a178dFF5e80F4E6c8105bbF9;
    address inv1 = 0x03A2125C566D8911d1dd4153be17b51a0d848eb8;
    address inv2 = 0x071F07c1944715A2F3Ac0AbdA3ec2457f22c894C;
    address bestFriend = 0x1AC10525357764bE68f8735007B92b62682C9ed6;

    uint256 seedPhase = 5 minutes; // время подготовительной фазы
    uint256 privatePhase = 10 minutes; // время закрытой фазы
    uint256 Time_start = block.timestamp; // время старта системы
    uint256 Time_dif = 0; // добавленное время

    uint256 dec = 10**decimals();
    uint256 counterToProvider = 0;
    uint256 publicPrice = 0.001 ether;
    uint256 constant privatePrice = 0.00075 ether;

    uint256 privateAmount;
    uint256 publicAmount;
    uint256 availableOwnerTokens = 0; // доступные токены овнеру

    enum Role {
        User,
        publicProvider,
        privateProvider,
        Owner
    } // роли предусмотренные в системе

    /*
        структура пользователя
        структура запроса в вайтлист
    */

    struct User {
        string login;
        address wallet;
        uint256 seedTokens;
        uint256 privateTokens;
        uint256 publicTokens;
        Role role;
        bool whitelist;
    }

    struct Whitelist {
        string login;
        address wallet;
        bool status;
    }

    Whitelist[] whitelistRequests; // список запросов в вайтлист
    Whitelist[] whitelist; // вайтлист

    /*
        хранилище пользователей их логинов и захэшированных паролей
    */

    mapping(address => User) public userMap;
    mapping(string => address) public loginMap;
    mapping(address => bytes32) public passwordMap;

    constructor() {
        /*
            определение владельца системы
            минт ему 10 млн токенов
            определение суммы для фазы закрытой продажи
            определение суммы для фазы открытой продажи
        */

        owner = msg.sender;
        _mint(owner, 10000000 * dec);
        privateAmount = (balanceOf(owner) * 30) / 100;
        publicAmount = (balanceOf(owner) * 60) / 100;

        /*
            перевод токенов от овнера инвесторам поддержавшим проект 
        */
        transfer(inv1, 300000 * dec);
        transfer(inv2, 400000 * dec);
        transfer(bestFriend, 200000 * dec);

        /*
            регистрация пользователей уже занесенных в систему при старте
        */

        userMap[owner] = User(
            "owner",
            owner,
            100000 * dec,
            privateAmount,
            publicAmount,
            Role.Owner,
            false
        );
        loginMap["owner"] = owner;
        passwordMap[owner] = keccak256(abi.encode("123"));

        userMap[privateProvider] = User(
            "privateProvider",
            privateProvider,
            balanceOf(privateProvider),
            0,
            0,
            Role.privateProvider,
            true
        );
        loginMap["privateProvider"] = privateProvider;
        passwordMap[privateProvider] = keccak256(abi.encode("123"));

        userMap[publicProvider] = User(
            "publicProvider",
            publicProvider,
            balanceOf(publicProvider),
            0,
            0,
            Role.publicProvider,
            false
        );
        loginMap["publicProvider"] = publicProvider;
        passwordMap[publicProvider] = keccak256(abi.encode("123"));

        userMap[inv1] = User(
            "inv1",
            inv1,
            balanceOf(inv1),
            0,
            0,
            Role.User,
            false
        );
        loginMap["inv1"] = inv1;
        passwordMap[inv1] = keccak256(abi.encode("123"));

        userMap[inv2] = User(
            "inv2",
            inv2,
            balanceOf(inv2),
            0,
            0,
            Role.User,
            false
        );
        loginMap["inv2"] = inv2;
        passwordMap[inv2] = keccak256(abi.encode("123"));

        userMap[bestFriend] = User(
            "bestFriend",
            bestFriend,
            balanceOf(bestFriend),
            0,
            0,
            Role.User,
            false
        );
        loginMap["bestFriend"] = bestFriend;
        passwordMap[bestFriend] = keccak256(abi.encode("123"));
    }

    /*
        функция регистрации в системе, принимает логин пароль, логин должен быть уникальным
    */
    function signUp(string calldata _login, string calldata _password) public {
        require(
            loginMap[_login] == address(0),
            unicode"Пользователь с таким логином уже существует"
        );
        userMap[msg.sender] = User(
            _login,
            msg.sender,
            balanceOf(msg.sender),
            0,
            0,
            Role.User,
            false
        );
        loginMap[_login] = msg.sender;
        passwordMap[msg.sender] = keccak256(abi.encode(_password));
    }

    /*
        функция авторизации пользователя принимает логин пароль возвращает структуру пользователя
    */
    function signIn(string calldata _login, string calldata _password)
        public
        view
        returns (User memory)
    {
        require(
            passwordMap[loginMap[_login]] == keccak256(abi.encode(_password)),
            unicode"Неверно введены данные"
        );
        return userMap[loginMap[_login]];
    }

    /*
        функция добавления минуты к системному времени
    */
    function addMinute() public {
        Time_dif += 60;
    }

    /*
        функция возвращения системного времени
    */
    function getLifeTime() public view returns (uint256) {
        return block.timestamp + Time_dif - Time_start;
    }

    /*
        функция возвращения времени старта системы
    */
    function getTimeStart() public view returns (uint256) {
        return Time_start;
    }

    /*
        функция отправления запроса в вайтлист, принимает логин пользователя, не состоящего в вайтлисте
        и не подавшего заявку ранее
    */

    function sendRequest(string calldata _login) public {
        require(!userMap[msg.sender].whitelist, unicode"Вы уже в вайтлисте");
        require(
            block.timestamp + Time_dif - Time_start < seedPhase,
            unicode"Заявку можно подать только до начала закрытой покупки"
        );
        for (uint256 i = 0; i < whitelistRequests.length; i++) {
            require(
                keccak256(abi.encode(whitelistRequests[i].login)) !=
                    keccak256(abi.encode(_login)),
                unicode"Вы уже подали заявку"
            );
        }
        whitelistRequests.push(Whitelist(_login, msg.sender, false));
    }

    /*
        функция возвращения счетчика переводов овнера к провайдерам
    */
    function getCounter() public view returns (uint256) {
        return counterToProvider;
    }

    /*
        функция возвращения запросов в вайтлист
    */
    function getRequests()
        public
        view
        AccessControl(Role.privateProvider)
        returns (Whitelist[] memory)
    {
        return whitelistRequests;
    }

    /*
        функция определяющая кол-во доступных овнеру токенов
    */
    function setAvailableOwnerTokens() public AccessControl(Role.Owner) {
        uint256 expiredTime = block.timestamp + Time_dif - Time_start;
        if (expiredTime >= seedPhase + privatePhase) {
            availableOwnerTokens = userMap[privateProvider].privateTokens;
            userMap[owner].publicTokens += availableOwnerTokens;
            userMap[privateProvider].privateTokens = 0;
            _approve(privateProvider, owner, availableOwnerTokens);
            transferFrom(privateProvider, owner, availableOwnerTokens);
        }
    }

    /*
        функция возвращения доступных овнеру токенов
    */
    function getAvailableOwnerTokens() public view returns (uint256) {
        return availableOwnerTokens;
    }

    /*
        функция возвращения текущей цены токена
    */
    function getTokenPrice() public view returns (uint256) {
        uint256 tokenPrice = 0;
        uint256 expiredTime = block.timestamp + Time_dif - Time_start;
        if (expiredTime >= seedPhase + privatePhase) {
            tokenPrice = publicPrice;
        } else if (expiredTime > seedPhase) {
            tokenPrice = privatePrice;
        }
        return tokenPrice;
    }

    /*
        функция перевода токенов к провайдеру данной фазы, для дальнейших покупок
    */
    function transferToProvider(uint256 _phase)
        public
        AccessControl(Role.Owner)
    {
        if (_phase == 2) {
            transfer(privateProvider, privateAmount);
            userMap[privateProvider].privateTokens += privateAmount;
            userMap[owner].privateTokens -= privateAmount;
            counterToProvider = 1;
        } else if (_phase == 3) {
            transfer(publicProvider, publicAmount);
            userMap[publicProvider].publicTokens += publicAmount;
            userMap[owner].publicTokens -= publicAmount;
            counterToProvider = 2;
        }
    }

    /*
        функция смены цены public токена, принимает новую цену
    */
    function changePublicPrice(uint256 _amount)
        public
        AccessControl(Role.publicProvider)
    {
        publicPrice = _amount;
    }

    /*
        функция покупки токена, принимает желаемое кол-во
    */
    function buyToken(uint256 _amount) public payable {
        uint256 tokenPrice = getTokenPrice();
        if (tokenPrice == privatePrice) {
            require(
                userMap[msg.sender].whitelist,
                unicode"Free sale not started"
            );
            require(
                msg.value >= (_amount / dec) * tokenPrice,
                unicode"Вы передали недостаточно ether"
            );
            require(
                _amount / dec <= 100000,
                unicode"Максимальное значение 100000 CMON за 1 транзакцию"
            );
            userMap[msg.sender].privateTokens += _amount;
            payable(owner).transfer(msg.value);
            transferFrom(privateProvider, msg.sender, _amount);
            userMap[privateProvider].privateTokens -= _amount;
        } else if (tokenPrice == publicPrice) {
            require(
                msg.value >= (_amount / dec) * tokenPrice,
                unicode"Вы передали недостаточно ether"
            );
            require(
                _amount / dec <= 5000,
                unicode"Максимальное значение 100000 CMON за 1 транзакцию"
            );
            if (msg.sender == owner) {
                availableOwnerTokens += _amount;
            }
            userMap[msg.sender].publicTokens += _amount;
            payable(owner).transfer(msg.value);
            transferFrom(publicProvider, msg.sender, _amount);
            userMap[publicProvider].publicTokens -= _amount;
        }
    }

    /*
        функция обработки запроса в вайтлист, принимает номер запроса и решение провайдера
    */
    function takeRequest(uint256 _index, bool _solut)
        public
        AccessControl(Role.privateProvider)
    {
        if (_solut) {
            whitelistRequests[_index].status = true;
            address userAddress = whitelistRequests[_index].wallet;
            string memory userLogin = whitelistRequests[_index].login;
            userMap[userAddress].whitelist = true;
            whitelist.push(Whitelist(userLogin, userAddress, false));
        } else {
            delete whitelistRequests[_index];
        }
    }

    /*
        функция возвращения вайтлиста
    */
    function getWhitelist()
        public
        view
        AccessControl(Role.privateProvider)
        returns (Whitelist[] memory)
    {
        return whitelist;
    }

    /*
        функция получения информации о пользователе для овнера, принимает адрес пользователя
    */
    function getUserData(address _wallet)
        public
        view
        AccessControl(Role.Owner)
        returns (User memory)
    {
        return userMap[_wallet];
    }

    /*
        функция получения информации о public токенах пользователя для провайдера, принимает адрес пользователя
    */
    function getPublicTokens(address _wallet)
        public
        view
        AccessControl(Role.publicProvider)
        returns (uint256)
    {
        return userMap[_wallet].publicTokens;
    }

    /*
        функция получения информации о private токенах пользователя для провайдера, принимает адрес пользователя
    */
    function getPrivateTokens(address _wallet)
        public
        view
        AccessControl(Role.privateProvider)
        returns (uint256)
    {
        return userMap[_wallet].privateTokens;
    }

    /*
        функция получения всего баланса пользователя
    */
    function getBalance()
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256
        )
    {
        return (
            userMap[msg.sender].seedTokens,
            userMap[msg.sender].privateTokens,
            userMap[msg.sender].publicTokens,
            msg.sender.balance
        );
    }

    /*
        функция награждения пользователя public токенами от public провайдера, принимает адрес и кол-во токенов
    */
    function giveReward(address _wallet, uint256 _amount)
        public
        AccessControl(Role.publicProvider)
    {
        require(
            userMap[publicProvider].publicTokens >= _amount,
            unicode"Вы пытаетесь наградить большим кол-вом чем у вас есть"
        );
        if (_wallet == owner) {
            availableOwnerTokens += _amount;
        }
        transfer(_wallet, _amount);
        userMap[publicProvider].publicTokens -= _amount;
        userMap[_wallet].publicTokens += _amount;
    }

    /*
        функция перевода токенов, принимает адрес и кол-во токенов
    */
    function transferToken(address _wallet, uint256 _amount) public {
        uint256 expiredTime = block.timestamp + Time_dif - Time_start;
        if (expiredTime < seedPhase) {
            require(
                userMap[msg.sender].seedTokens >= _amount,
                unicode"Вы пытаетесь перевести больше чем у вас есть"
            );
            transfer(_wallet, _amount);
            userMap[msg.sender].seedTokens -= _amount;
            userMap[_wallet].seedTokens += _amount;
        } else if (expiredTime > seedPhase + privatePhase) {
            require(
                userMap[msg.sender].publicTokens >= _amount,
                unicode"Вы пытаетесь перевести больше чем у вас есть"
            );
            if (msg.sender == owner) {
                setAvailableOwnerTokens();
            }
            transfer(_wallet, _amount);
            userMap[msg.sender].publicTokens -= _amount;
            userMap[_wallet].publicTokens += _amount;
        } else {
            revert(unicode"Во время приватной фазы нельзя переводить");
        }
    }

    function decimals() public view virtual override returns (uint8) {
        return 12;
    }

    /*
        ролевой модификатор доступа принимающий роль и сверяющий её с ролью пользователя вызвавшего функцию
    */
    modifier AccessControl(Role _role) {
        require(userMap[msg.sender].role == _role, unicode"У вас нет доступа");
        _;
    }
}
