//! Execute this file i.e node SESEmailer.js then email will be sent

const AWS = require("aws-sdk");
require("dotenv").config();

const subscriberEmailTemplate = require("./emailTemplates/subscriberEmailTemplate");
const contactUsEmailTemplate = require("./emailTemplates/contactUsEmailTemplate");

const SES_CONFIG = {
  accessKeyId: "AKIAV5FYFQS5BIHI5M2T",
  secretAccessKey: "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",
  region: "ap-south-1",
};

const AWS_SES = new AWS.SES(SES_CONFIG);

const sendNewsLetterEmail = async (subscriberEmail) => {
  let params = {
    Source: "yourschoolsoftwares@gmail.com",
    Destination: {
      ToAddresses: ["yourschoolsoftwares@gmail.com"],
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: subscriberEmailTemplate(subscriberEmail),
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: `Your School Software: Subscription Email`,
      },
    },
  };

  try {
    const res = await AWS_SES.sendEmail(params).promise();
    console.log("Email sent successfully", res);
    return true;
  } catch (error) {
    console.log(error);
  }
};

const sendContactUsEmail = async (email, subject, message) => {
  let params = {
    Source: "yourschoolsoftwares@gmail.com",
    Destination: {
      ToAddresses: ["yourschoolsoftwares@gmail.com"],
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: contactUsEmailTemplate(email, subject, message),
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: `Your School Software: Contact Us Enquiry`,
      },
    },
  };

  try {
    const res = await AWS_SES.sendEmail(params).promise();
    console.log("Email sent successfully", res);
    return true;
  } catch (error) {
    console.log(error);
  }
};

// sendContactUsEmail();

// named export
module.exports = {
  sendNewsLetterEmail,
  sendContactUsEmail,
};
