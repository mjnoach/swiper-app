# Swiper App

  .                        | .                         | .                     
:-------------------------:|:-------------------------:|:-------------------------:
![](/assets/app-screen-1.png)         |  ![](/assets/app-screen-2.png)       |  ![](/assets/app-screen-3.png)       



## `🚀 start`

1. Set up local environment

```
cd backend/api; cp .env.example .env; cd ../..;
cd backend/db; cp .env.example .env; cd ../..;
cd frontend; cp .env.example .env; cd ..;
```

2. Run containerized backend: db & api

```
yarn docker:backend
```

3. Install & run the frontend

```
yarn frontend
```
