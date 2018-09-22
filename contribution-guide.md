# Contributing to Infox

Go through [the todo list][I]. Take up any topic of interest and discuss your plan to work on that idea (try using the issue tracker for this purpose). Develop a basic prototype. Make a pull request.


### Submitting a bug report/feature request

Search the issue tracker to ensure that there is no open issue addressing the bug.
If that is the case, open a new issue. Make sure to include a clear title, description, and as much relevant information as possible.
Add the feature label if you have a new feature to add in your mind.

### Submitting a pull request

For beginners:
1. Install git.
2. Fork the project to your account.
3. Clone your project fork to your computer.
```
git clone git@github.com:yourgithubuser/infox18.git
```
4. Add the original project repo as upstream repository in your forked project.
```
git remote add upstream git@github.com:entity/infox18.git
```
5. Create a new branch from master.
```
git checkout -b myfixes
```
6. Work on the project and make some commits to the project.
```
git commit -a -m "My fixes"
```
5. Push this branch to your GitHub project.
6. Open a Pull Request on GitHub.
8. The pull request is merged or closed after approval.

### Starting the project
1. Make sure node and npm is installed on your pc.
2. Open the project folder in terminal and run command:
```
npm install --save
```
3. In the same folder run following command to start to start the project:
```
node app.js
```
4. Navigate to localhost:8080 in any web browser.

Take a look at : 
* https://guides.github.com/introduction/flow/
* https://akrabat.com/the-beginners-guide-to-contributing-to-a-github-project/

[I]: /TODO.md

