SELECT cu."email", CONCAT_WS(' ', cu."firstName", cu."lastName") AS "name", d."name" AS "department_name" 
FROM core_hr_sch."User" AS cu 
RIGHT JOIN core_hr_sch."Employee" AS e ON cu."id" = e."user_id" 
JOIN core_hr_sch."Department" AS d ON e."department_id" = d."id" 
WHERE e."active" = true;