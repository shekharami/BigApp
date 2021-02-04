## 1. /api/mail/saveEmail

    A POST route and returns the saved Object:

    format of JSON object to be posted:

    {
    "email" : <Array of recipients>,
    "subject" : <Subject Line>,
    "mailText" : <Mail body>
    }

    Example:

    {
    "email" : ["example@test.com"],
    "subject" : "A subject",
    "mailText" : "A mail body"
    }

## 2. /api/mail/getAllEmails

    A GET route that lists all the emails saved in the database.

emailId must be a mongoDb ObjectId (Applicable to all the routes defined onwards)

## 3. /api/mail/sendMail/:emailId

    A GET route to send emails using email Id as parameter

## 4. /api/mail/getReport/:emailId

    A GET route to get the statistics of the email having mongoDb ObjectId as emailId.

    Must be used after using /sendMail/:emailId route for a particular emailId.
    Also for getting tye stats, the user should enable the Event Webhook of SendGrid. For this:

    1. Go to (https://app.sendgrid.com/settings/mail_settings)
    2. Edit Event Webhook under Event Setting section
    3. Provide the http POST URL as {Base URL}/api/mail/sgEventNotification
    4. Events to be POSTed to your URL: Checkboxes to be checked (Dropped, Defferred, Bounced, delivered)
    5. Click on 'Save'

    If you are running this App on localhost: Please download *** ngrok *** and run it. (It exposes your server running on localhost to the web)

## 5. /api/mail/deleteMail&Stats/:emailId

    A DELETE route to delete your email from database

## 6. /api/mail/updateEmail/:emailId

    A PATCH route to update an email using its mongoDb ObjectId as <emailId>:

    It requires JSON object in the following format:

    {
    "email" : <Array of recipients>,
    "subject" : <Subject Line>,
    "mailText" : <Mail body>
    }

    Example:

    {
    "email" : ["example@test.com"],
    "subject" : "A subject",
    "mailText" : "A mail body"
    }

    Or a combination of any of the above.
