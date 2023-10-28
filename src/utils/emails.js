const nodemailer = require('nodemailer')
exports.myEmail = async (email,message) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "ecommerceapp58@gmail.com", 
            pass: "fowjksoyjqkmfmba",
        },
    });
    

    transporter.sendMail({
        from: 'ecommerceapp58@gmail.com', 
        to: email, 
        subject:'Hello', 
        html:message, 
    },(err,info)=>{
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
}