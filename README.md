# Swiper App

![](/frontend/public/img-1.png) | ![](/frontend/public/img-2.png) | ![](/frontend/public/img-3.png)       
-- | -- | --


1. Set up local environment

   ```bash
   cp backend/api/.env.example backend/api/.env
   cp backend/db/.env.example backend/db/.env
   cp frontend/.env.example frontend/.env
   ```

2. Start the backend

   ```bash
   yarn docker:backend
   # OR
   yarn docker:db
   yarn api
   ```

3. Start the frontend

   ```bash
   yarn frontend
   ```
