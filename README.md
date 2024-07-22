# Swiper App

<!-- ![](/frontend/public/img-1.png) | ![](/frontend/public/img-2.png) | ![](/frontend/public/img-3.png) | ![](/frontend/public/img-4.png)
-- | -- | -- | -- -->
![](/frontend/public/swiper-app.png) | 
-- | 


Live preview  
🟢 [Web Client](https://swiper-app-client.vercel.app/sign-in)  
🟢 [API](https://swiper-app-api.onrender.com)  
<br />

1. Set up the environment

   ```bash
   cp backend/api/.env.example backend/api/.env
   cp backend/db/.env.example backend/db/.env
   cp frontend/.env.example frontend/.env
   ```

2. Start backend services

   ```bash
   yarn docker:backend
   # OR
   docker network create swiper-app
   yarn docker:db
   yarn docker:api
   ```

3. Start the frontend

   ```bash
   yarn frontend
   ```
