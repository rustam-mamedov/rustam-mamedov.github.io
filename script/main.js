// noinspection JSJQueryEfficiency

(async function(){
    const serverUrl = "https://dy7z4ucd3eyu.usemoralis.com:2053/server";
    const appId = "5OXfrBP94JD5052fq6JweDLfOBQIp6CuGEatBQar";
    Moralis.start({serverUrl, appId});

    const options = {
        contractAddress: "0x86ed00ddf09cDf8D136d272eE4d6f136c5dA4113",
        abi: [{"inputs":[{"internalType":"contract ILiquidityAgent","name":"_liquidityAgent","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"userId","type":"uint256"},{"indexed":false,"internalType":"uint8","name":"level","type":"uint8"}],"name":"BuyLevel","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"referrerId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"referralId","type":"uint256"},{"indexed":false,"internalType":"uint8","name":"level","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"rewardValue","type":"uint256"}],"name":"MissedReferralPayout","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"referrerId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"referralId","type":"uint256"},{"indexed":false,"internalType":"uint8","name":"level","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"rewardValue","type":"uint256"}],"name":"ReferralPayout","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"userAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"SentToLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"userId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"referrerId","type":"uint256"}],"name":"UserRegistration","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"levelPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"liquidityAgent","outputs":[{"internalType":"contract ILiquidityAgent","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"liquidityPercents","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"referralRewardPercents","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"registrationPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"rewardPayouts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"rewardPercents","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"register","outputs":[],"stateMutability":"payable","type":"function","payable":true},{"inputs":[{"internalType":"address","name":"referrer","type":"address"}],"name":"registerWithReferrer","outputs":[],"stateMutability":"payable","type":"function","payable":true},{"inputs":[{"internalType":"uint8","name":"level","type":"uint8"}],"name":"buyLevel","outputs":[],"stateMutability":"payable","type":"function","payable":true},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getLevelsView","outputs":[{"internalType":"bool[]","name":"","type":"bool[]"},{"internalType":"uint8[]","name":"","type":"uint8[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"getContractBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getReferrer","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"isUserRegistered","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"userId","type":"uint256"}],"name":"getUserAddressById","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserIdByAddress","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getReferrerId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"isContract","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true}]
    };

    window.user = Moralis.User.current();
    user && (await Moralis.enableWeb3());
    await refreshMenuButtons();

    async function connect() {
        user = await Moralis.authenticate({signingMessage: "I want to connect wallet to website"})
            .then(async function (_user) {
                user = _user;
                await refreshMenuButtons();
                log(`User successfully connected: ${user.get("ethAddress")}`);
            })
            .catch(function (error) {
                log(`Something went wrong while login: ${error}`);
            });
    }

    async function registration() {
        let referrerAddress = prompt("Enter referrer address");
        if (!referrerAddress) {
            await Moralis.executeFunction({
                functionName: 'register',
                msgValue: Moralis.Units.ETH('0.05'),
                ...options
            })
            log(`User successfully registered`);
        } else {
            await Moralis.executeFunction({
                functionName: 'registerWithReferrer',
                msgValue: Moralis.Units.ETH('0.05'),
                params: {
                    referrer: referrerAddress
                },
                ...options
            })
            log(`User successfully registered`);
        }
    }

    async function loadLevels() {
        let resp = await Moralis.executeFunction({
            functionName: 'getLevelsView',
            params: {
                userAddress: user.get("ethAddress")
            },
            ...options
        })

        let results = { totalLevels: resp[0].length - 1 }
        for(let i = 1; i < resp[0].length; i++) {
            results[i] = {
                active: resp[0][i],
                curPayouts: resp[1][i],
                price: resp[2][i]
            }
        }

        return results
    }
    async function buyLevel() {
        let level = prompt("Enter level to buy:");
        try {
            level = parseInt(level)
        } catch (e) {
            level = null
        }

        if (!level) {
            log("Entered invalid level")
            return
        }

        let levels = await loadLevels();
        let levePrice = levels[level].price
        if (confirm(`${level} level price is ${Moralis.Units.FromWei(levePrice)} BNB`)) {
            await Moralis.executeFunction({
                functionName: 'buyLevel',
                msgValue: levePrice,
                params: {
                    level: level
                },
                ...options
            })
            log(`User successfully bought ${level} level`)
        } else {
            log(`Level buying is cancelled`)
        }
    }

    async function logout() {
        await Moralis.User.logOut();
        user = null;
        await refreshMenuButtons();
        log("User successfully logged out");
    }

    async function refreshMenuButtons() {
        let $levels = $('#levels');
        if (!user) {
            $('.when-logged-in').hide();
            $('.when-not-logged-in').show();
            $levels.hide();
            return
        }

        $('.when-logged-in').show();
        $levels.show();
        $('.when-not-logged-in').hide();

        $('#address').html(`Your address: ${user.get("ethAddress")}`);

        let isUserRegistered = await Moralis.executeFunction({
            functionName: 'isUserRegistered',
            params: {
                addr: user.get("ethAddress")
            },
            ...options
        })

        $levels.html('')
        if (isUserRegistered) {
            $('.when-registered').show();
            $('.when-not-registered').hide();

            let levels = await loadLevels()
            for(let level = 1; level <= levels.totalLevels; level++) {
                $levels.append(`
                    <div class="level">
                        Level: ${level}
                        <br>
                        Active: ${levels[level].active}
                        <br>
                        Current Payouts: ${levels[level].curPayouts}
                        <br>
                        Price: ${Moralis.Units.FromWei(levels[level].price)} BNB
                    </div>
                `)
            }
        } else {
            $('.when-registered').hide();
            $('.when-not-registered').show();
        }
    }

    function log(msg) {
        if (typeof msg === 'object') {
            console.dir(msg)
            $('#alert').text("Log object printed in console")
        } else {
            $('#alert').text(msg)
        }
    }

    $('#btn-reload').click(refreshMenuButtons);
    $('#btn-connect').click(connect);
    $('#btn-logout').click(logout);
    $('#btn-registration').click(registration);
    $('#btn-buy-level').click(buyLevel);
})();