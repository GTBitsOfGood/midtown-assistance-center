import axios from 'axios';

/* Attempts to log in using the provided credentials; if a failure callback is
 * provided, it will be called
 */
function attemptLogin(username, password, failureCallback = null) {
    const userDetails = {
        username,
        password,
        logInTime: Date.now()
    };

    // Look at passportConfig.js /login endpoint
    axios
        .post('/login', userDetails)
        .then(response => {
            if (response.data !== '') {
                document.location.href = '/dash';
            } else {
                console.log("RES");
                console.log(response.data);
                if (failureCallback) {
                    failureCallback();
                }
            }
        })
        .catch(error => {
            console.log("ERROR");
            console.log(error);
            if (failureCallback) {
                failureCallback();
            }
        });
}

export default attemptLogin;