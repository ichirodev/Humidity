# Online Humidity Sensors with ESP32/8266
### Set your project up
#### Database setup
Create a new schema called `hsensors` on your DB
#### Server set-up
Before trying to run the server you have to make sure
the information set on the file [application.properties](server/src/main/resources/application.properties) is correct.
```
# If you would like to see the SQL Queries set this value to true
spring.jpa.show-sql=false
# In case you are willing to use another database driver, if 
# you want to stick with MySQL leave this as it is
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
# Your database url, by default it runs on your localhost
spring.datasource.url=jdbc:mysql://localhost:3306/hsensors
# Your database username, set this wisely if you are thinking on
# exposing this to the internet
spring.datasource.username=root
# Your database password
spring.datasource.password=123456
# Important setting so you don't have to create tables in advanced to
# use the program
spring.jpa.hibernate.ddl-auto=update
```
#### Web App

#### ESP32/8266
