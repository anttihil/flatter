# flatter

A minimalist message board site built with NodeJS, Express, Pug, and TailwindCSS. This is a side-project of mine, built for personal use. This is not a library or NPM package, but I thought it could be a useful example for those who are interested in building a message board from scratch in NodeJS.

## Technologies

### Database
PostgresSQL. I use node-postgres and pg-promise libraries to handle database connections and queries. This app does not use models, only raw queries. The key for me has been to use dynamic, parameterized queries offered by pg-promise. I highly recommend that library.

### Server
ExpressJs framework.

### Client 
PugJS template engine with a light amount of vanilla javascript to bring interactivity. TailwindCSS to streamline the process of writing CSS. 

### CDN 
DigitalOcean Spaces object storage for uploading and serving images. This app is also compatible with AWS S3 because they use the same SDK.

### Security
- User authentication: PassportJS
- Server side input validation and sanitization: Express-Validator for text and Node file-type library for images and other files 
- Client side input validation: HTML form pattern validation 
- CSRF protection: ExpressJS CSURF
- Password hashing: NodeJS Argon2
- SQL injection prevention: parameterized queries in PG promise

## Cloning? 

If you are interested in testing this code on your local machine, here are the main things you need to do: 
1) Clone the repo using the normal Github method (Google: clone a Github repo)
2) Install PostgreSQL on your machine (Google is your friend here)
3) Configure a DigitalOcean Spaces object storage (or AWS S3) (This is the trickiest step, but DigitalOcean has pretty good documentation.)
4) Rename the "dotEnvExample" file to .env and fill in the parameters there by following the instructions in the file.
5) Run "npm install" on your console in the project folder to install node modules.


