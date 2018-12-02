API USAGE
CONNECTS TO THE MONGO DB


/**** START CORE FRAMEWORK API ****/

#------------------------------------------------------------------------------------------------------------
INSERTING ONE RECORD
URL: http://localhost:3001/api/insertone/ 
METHOD: GET

DESCRIPTION: This API has been called in backend-service. 
NOTE: If for production please use http://23.96.114.163:3001/api/insertone/ 

BODY:

{
    "userid": "jev123",
    "username": null,
    "phonenumber": null,
    "password":null,
    "preferred_language": "en",
    "country": null,
    "occupation": null,
    "yearsofexpereince": null,
    "age": null,
    "gender": null,
    "currentcourse": null,
    "lastcourse": null,
    "listofcompletedcourses": [],
}
#------------------------------------------------------------------------------------------------------------

#------------------------------------------------------------------------------------------------------------

REMOVING ONE RECORD
URL: http://localhost:3001/api/removeonedocument/
METHOD: POST
DESCRIPTION: Removes one record in the database
NOTE: If for production please use http://23.96.114.163:3001/removeonedocument/

BODY:
{
	"userid":"jev124"
}

#------------------------------------------------------------------------------------------------------------


#------------------------------------------------------------------------------------------------------------

UPDATING A RECORD
URL: http://localhost:3001/api/updateone/
METHOD : POST
DESCRIPTION : If a record already exist and you want to update a specific attributes, then that will be the your parameters.
NOTE: hence "userid" is always included, this is our Atomic Operator or Primary Key.
NOTE: If for production please use http://23.96.114.163:3001/api/updateone/

Example: if you are updating the occupation and gender only pass the attributes of userid, occupation, and gender.

BODY:
{
    "userid": "jev123",
    "occupation": "Developer",
    "gender": "male"
}

#------------------------------------------------------------------------------------------------------------

API to update Course Completed
URL: http://localhost:3001/api/updateone/appendcompletedcourse/
METHOD: POST
NOTE: If for production please use http://23.96.114.163:3001/api/updateone/appendcompletedcourse/

BODY:
{
    "userid": "jev123",
    "listofcompletedcourses": [{
    	"course": "English 2",
    	"score": 9.5,
    	"date": "2019-08-09",
    	"time_spent": 5
    }]
}

#------------------------------------------------------------------------------------------------------------

API to Authenticate User
URL: http://localhost:3001/api/loginauth/
METHOD: POST
DESCRIPTION : If the user input match a record in the DB it will return "auth":"True" with corresponding userid, otherwise it will just return only "auth":"False".
NOTE: If for production please use http://23.96.114.163:3001/api/loginauth/

BODY:

{
	"phonenumber": "1234567890",
	"password": "0987654321"
}

Expected output :
{"auth":"True","userid":"1564990577110"}

#------------------------------------------------------------------------------------------------------------


API to get user-profile


URL: http://localhost:3001/api/getuserprofile
METHOD: POST
Details : It will return all the userprofile attributes except for the password.
NOTE: If for production please use http://23.96.114.163:3001/api/getuserprofile/

PARAMETER:
{
	"phonenumber": "1234567890"
}

Sample Expected output:
{"userid":"97148042666","username":"jev123","phonenumber":"1234567890","currentcourse":null,"lastcourse":null,"listofcompletedcourses":[],"age":"25","gender":"Male","occupation":"Developer","tasks":"Application Development|AI","yearsofexperience":"2009-06"} 


#------------------------------------------------------------------------------------------------------------

/**** END CORE FRAMEWORK API ****/






/**** START CORE WEBUI API ****/

#------------------------------------------------------------------------------------------------------------

Updating one record from UI Mobile Directly
URL: http://localhost:3001/api/updateone/uimobile
METHOD: POST
DESCRIPTION: If the record to update already exist, the API can just send a particular attribute to be updated. Please sample below.
NOTE: hence "userid" is always included, this is our Atomic Operator or Primary Key.
NOTE: If for production please use http://23.96.114.163:3001/api/updateone/uimobile

Example 1. To update country only
{
    "userid": "jev123",
    "country": "Philippines"
}

Example 1. To update multiple attributes age, username, occupation

{
    "userid": "jev123",
    "age": "25-30"
    "username": "jev"
    "occupation":"developer"
}

#------------------------------------------------------------------------------------------------------------


#------------------------------------------------------------------------------------------------------------


API to Authenticate User from UI Mobile Directly
URL: http://localhost:3001/api/loginauth/
METHOD: POST
DESCRIPTION: If the record to update already exist, the API will return {"auth":"True", "userid":"jev123"} or {"auth":"False"}.
NOTE: If for production please use http://23.96.114.163:3001/api/loginauth/

Parameter:

{
	"phonenumber": "1234567890",
	"password": "0987654321"
}


#------------------------------------------------------------------------------------------------------------


API to get user-profile

URL: http://localhost:3001/api/getuserprofile
METHOD: POST
Details : It will return all the userprofile attributes except for the password.
NOTE: If for production please use http://23.96.114.163:3001/api/getuserprofile/

PARAMETER:
{
	"phonenumber": "1234567890"
}

Sample Expected output:
{"userid":"97148042666","username":"jev123","phonenumber":"1234567890","currentcourse":null,"lastcourse":null,"listofcompletedcourses":[],"age":"25","gender":"Male","occupation":"Developer","tasks":"Application Development|AI","yearsofexperience":"2009-06"} 

#------------------------------------------------------------------------------------------------------------