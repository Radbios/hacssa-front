export function singIn(){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                token: "skbdfsajdvgasjdgsakdja",
                user: {
                    name: "Fabiano",
                    email: "radbios@gmail.com"
                }
            });
        }, 2000);
    });
}