# Swiper App

![](/assets/img-1.png) | ![](/assets/img-2.png) | ![](/assets/img-3.png)       
-- | -- | --

## `🚀 start`

1. Set up local environment

```bash
cd backend/api; cp .env.example .env; cd ../..;
cd backend/db; cp .env.example .env; cd ../..;
cd frontend; cp .env.example .env; cd ..;
```

2. Start up the backend

```bash
yarn docker:backend
# OR
yarn db
yarn api
```

3. Start up the frontend

```bash
yarn frontend
```
