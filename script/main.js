(function(){
    const serverUrl = "https://dy7z4ucd3eyu.usemoralis.com:2053/server";
    const appId = "5OXfrBP94JD5052fq6JweDLfOBQIp6CuGEatBQar";
    Moralis.start({serverUrl, appId});

    /* Authentication code */
    async function login() {
        let user = Moralis.User.current();
        if (!user) {
            user = await Moralis.authenticate({
                signingMessage: "Log in using Moralis",
            })
                .then(function (user) {
                    console.log("logged in user:", user);
                    alert(user.get("ethAddress"));
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    async function logOut() {
        await Moralis.User.logOut();
        console.log("logged out");
    }

    document.getElementById("btn-login").onclick = login;
    document.getElementById("btn-logout").onclick = logOut;
})();