# Foxy File Back End

What does the app do, how does it work?

The app allows users to upload their own files. Once uploaded, other users can view and download their files as well as their own. Users can also edit and delete files they own from the app. The app make heavy use of the Amazon S3 service to handle upload and storage of files.

[Link to front end repo](https://github.com/team-jorgie/team-project-front-end)

[Link to deployed front end](https://team-jorgie.github.io/team-project-front-end/)

[Link to deployed back end](https://warm-tor-57872.herokuapp.com/)

Technologies used

- Express
- Nodejs
- MongoDB
- Heroku
- Amazon S3
- aws-sdk

List of unsolved problems for future revision
- Ability to add additional contributors to a file.

Planning, Process and problem solving strategies

Early planning was more freeform, we knew we wanted to use Amazon’s S3 service to host the files and immediately set out to wireframe the design. We also had a relatively simple ERD to construct, so we also spent some time deciding how our workflow would work exactly and who would be responsible for different parts of the project

Our development process focused on people working either on their own or paired to try and maximize the usefulness of our time by tackling multiple objectives concurrently. We knew that the S3 component would take a long time to configure completely, and as such, Mike spent most of the first few days working on it, while Aubree and Dylan tackled the database configuration as well as building front end components for the website. Once the back end was finished, tasks were distributed so that people would be working on their own parts that would be integrated with others’ work later down the road. We also tried to identify strengths of each developer and lean into them.

We used pair programming fairly extensively when possible to ensure that developers would frequently have a second set of eyes. If the odd person out was needed, we worked close by or when remotely, with slack constantly open to ensure that people could always get the necessary assistance on particularly tricky coding challenges. Additionally at the end of development, Aubree stepped up to bug test the site to ensure all errors were well documented so they could be taken care of in a timely, orderly fashion.

[Link to ERD](https://imgur.com/a/DnzrAmq)


Routes

| Verb   | URI Pattern      | Controller#Action    |
|--------|------------------|----------------------|
| POST   | /users           | user#sign-up         |
| POST   | /users           | user#sign-in         |
| PATCH  | /users/:id       | user#change-password |
| DELETE | /users/          | user#sign-out        |
| GET    | /fileuploads     | fileupload#index     |
| GET    | /fileuploads/:id | fileupload#show      |
| POST   | /fileuploads     | fileupload#create    |
| PATCH  | /fileuploads/:id | fileupload#update    |
| DELETE | /fileuploads/:id | fileupload#delete    |
