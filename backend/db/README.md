# Swiper App Database

1. Set up the environment

   ```bash
   cp .env.example .env
   ```

2. Start the service

   ```bash
   docker build -t swiper-app--db .
   docker run -d -p 3306:3306 --name swiper-app--db --env-file .env swiper-app--db
   ```
