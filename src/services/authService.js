import decode from 'jwt-decode';
import { BASE_URL } from '../constantGlobal';
import axios from 'axios';
class authService {
    constructor() {
        this.getToken = this.getToken.bind(this);
        this.logout = this.logout.bind(this);
        this.getUserData = this.getUserData.bind(this);
        this.getUserId = this.getUserId.bind(this);
        this.getUserRole = this.getUserRole.bind(this);
        this.isValidToken = this.isValidToken.bind(this);
    }

    getToken() {
        if (localStorage.getItem('userToken')) {
            return localStorage.getItem('userToken');
        }
        return false;
    }

    logout() {
        let token = localStorage.getItem('userToken');
        if (this.getToken()) {
            localStorage.removeItem('userToken');
            localStorage.removeItem('userImg')
            axios
                .post(`${BASE_URL}/logout?token=${token}`)
                .then(() => {})
                .catch(error => {
                    console.log(error);
                });
        }
    }

    getUserData() {
        if (this.getToken()) {
            return decode(this.getToken());
        }
        return false;
    }

    getUserId() {
        let token = this.getToken();
        let userId;
        if (token) {
            userId = decode(this.getToken()).usuario._id;
        } else {
            userId = null;
        }
        return userId;
    }

    getUserRole(){
        let token = this.getToken();
        let userRole;
        if(token){
            userRole = decode(this.getToken()).usuario.role
        }else{
            userRole = null
        }
        return userRole
    }

    isValidToken(){
        let token = this.getToken();
        let validToken = ''
        axios.get(`${BASE_URL}/token/obtenerestado?token=${token}`).then(response => {
            if(!response.data.estado && response.data.codigo === '9999'){
                validToken = false;
            }else{
                validToken = true
            }
        }).catch(err => {
            console.log(err)
            validToken = false
        })
        return validToken
    }
}

export default new authService();
