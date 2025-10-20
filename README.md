# 🌐 Task 4 - React Web UI 


**NOTE:** Please read this README first.

---

## 📌 Requirements

- Node.js  
- Docker  

---

## 🛠 Dependencies

- `axios` – Promise-based HTTP client for browser & Node.js  
- `bootstrap` – Styling framework  
- `react`  
- `react-dom`  
- `react-scripts` – Create React App scripts  
- `react-toastify` – To generate toast notifications  
- `reactstrap` – Bootstrap components for React  

---


   ## Steps to Build

1. Open the folder `/task3` in VS Code.
Wait for few minutes while the IDE loads and completes necessary pre-build tasks.

2. Run `npm install`
This will install dependencies.

3. Run `npm start`
React application will start on port `3000` of the `localhost`.

4. Run `npm run build`
This will build the artifacts in `/build` folder.

## CRUD instructions

```javascript
createServer();	//axios.put
    
deleteServer(id);	//axios.delete
    
findServerById(id);	//axios.get

findServerByName(name);	//axios.get
```

![Image](https://github.com/user-attachments/assets/068113a0-d3f3-4b2b-9d43-fd72d2ff59a0)

### Screenshots

![Image]()
![Image]()
![Image](https://github.com/user-attachments/assets/66cba476-61db-4174-b8f0-15e71bb70c14)
![Image](https://github.com/user-attachments/assets/7c9f5a93-7d68-4e84-bfba-c801f95b3aa3)
![Image](https://github.com/user-attachments/assets/ec9767c6-3401-4220-9a7a-993b951c575e)

# Kaiburr React Web Application

## 🚀 Containerizing the Application

The `Dockerfile` defines all the necessary steps to build the container image for this application:

```dockerfile
FROM nginx:alpine
COPY /build /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
```
1. Run the following command to build docker image
`sudo docker build -t <container_image_name> .`
This will create the app container image and add to you local repository.

2. To Run the app from container, run the following command
`sudo docker run -p 80:3000 <container_image_name>`
React Web Application will load and start on port `3000` of the `localhost`
You will see application logs in the terminal.

**Note:** *The docker-compose part is Documented in Task3*

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
