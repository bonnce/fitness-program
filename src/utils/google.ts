export function googleInit(){
    function start(){
        gapi.client.init({
            'clientId': import.meta.env.CLIENT_ID,
            'scope': '',
        }).then(response => {
            console.log(response)
        })
    }
    gapi.load('client:auth2', start)
}