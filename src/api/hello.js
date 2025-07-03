const hello = () => {
    return {
        status_code: 200,
        data: {
            'message': 'Hello!'
        }
    };
};

module.exports = hello;