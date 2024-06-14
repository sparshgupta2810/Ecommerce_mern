const SummaryApi = {
    signIn: {
        url: 'http://localhost:8080/api/signin',
        method: 'POST'
    },
    signUp: {
        url: 'http://localhost:8080/api/SignUp',
        method: 'POST'
    },
    current_user: {
        url: 'http://localhost:8080/api/user-details',
        method: 'GET'
    },
    logout_user: {
        url: 'http://localhost:8080/api/userLogout',
        method: 'GET'
    },
    allUser: {
        url: 'http://localhost:8080/api/all-user',
        method: 'GET'
    },
    updateUser: {
        url: 'http://localhost:8080/api/update-user',
        method: 'POST'
    },
    uploadProduct : {
        url : 'http://localhost:8080/api/upload-product',
        method : 'post'
    },
    allProduct : {
        url : 'http://localhost:8080/api/get-product',
        method : 'get'
    },
    updateProduct : {
        url : 'http://localhost:8080/api/update-product',
        method  : 'post'
    },
    categoryProduct : {
        url : 'http://localhost:8080/api/get-categoryProduct',
        method : 'get'
    },
    categoryWiseProduct : {
        url : 'http://localhost:8080/api/category-product',
        method : 'post'
    },
    productDetails : {
        url : 'http://localhost:8080/api/product-details',
        method : 'post'
    },
};

export default SummaryApi;


