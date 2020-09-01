'SELECT DISTINCT "distinctAlias"."User_id" as 
"ids_User_id" FROM (SELECT "User"."id" AS "User_id",
 "User"."username" AS "User_username", "User"."email" 
 AS "User_email", "User"."password" AS "User_password",
  "User"."avatar" AS "User_avatar", "User"."date" AS 
  "User_date", "User"."salt" AS "User_salt", 
  "User_profile"."id" AS "User_profile_id", 
  "User_profile"."handle" AS "User_profile_handle", 

  "User_profile"."company" AS "User_profile_company", 
  "User_profile"."location" AS "User_profile_location",
   "User_profile"."website" AS "User_profile_website", 
   "User_profile"."status" AS "User_profile_status",
    "User_profile"."skills" AS "User_profile_skills", 
    "User_profile"."bio" AS "User_profile_bio",
     "User_profile"."githubusername" AS "User_profile_githubusername", 
     "User_profile"."experience" AS "User_profile_experience",
      "User_profile"."education" AS "User_profile_education", 
      "User_profile"."social" AS "User_profile_social" FROM "user"
      "User" LEFT JOIN "profile"
 "User_profile" ON  WHERE "User"."email" = $1) "distinctAlias" ORDER BY "User_id" ASC LIMIT 1',