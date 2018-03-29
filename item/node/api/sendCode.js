const SMSClient = require('@alicloud/sms-sdk')//引入阿里云模块

/*
 
 * 封装发送验证码模块
 * 
 * */
var SendCode = {
  aliyun(phoneNumber,signName, templateCode,code,callback){
      const accessKeyId = 'LTAI0JDaK8Y7ee9r'
      const secretAccessKey = 'eugN03iFWWa4NefXAmAxcDgN3PwkRm'
      //初始化sms_client
      let smsClient = new SMSClient({accessKeyId, secretAccessKey})
      //发送短信
      smsClient.sendSMS({
          PhoneNumbers: phoneNumber,
          SignName: signName,
          TemplateCode: templateCode,
          TemplateParam: '{"code":'+code+'}'
      }).then(function (res) {
          let {Code}=res
          if (Code === 'OK') {
              //处理返回参数
              callback(res)
          }
      }, function (err) {
          console.log(err)
      })
  }
}

module.exports = SendCode