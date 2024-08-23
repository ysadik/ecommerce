# Full Stack E-Commerce + Dashboard & CMS using React & Next.js

This repository combines two projects, an online store and an admin dashboard that also serves as a CMS.

## Features

* Admin dashboard is going to have both CMS and store management
* You will be able to control mulitple stores through this single CMS (For example you can have a "Shoe store" and a "Laptop store" and a "Suit store", and our CMS will generate API routes for all of those individually)
* You will be able to create, update and delete categories and products
* You will be able to upload multiple images for products, and change them whenever you want
* You will be able to create, update and delete filters such as "Color" and "Size"
* You will be able to create, update and delete "Billboards" which are these big texts on top of the page
* You will be able to Search through all categories, products, sizes, colors, billboards with included pagination
* You will be able to control which products are "featured" so they show on the homepage
* You will be able to see your orders, sales, etc
* You will be able to see graphs of your revenue etc

## Tech Stack

**Client:** React, Next.js, TailwindCSS, shadcn/ui

**Server:** Prisma, MongoDB

**Other:** Stripe, Clerk

## Installation

To install this project you have to run both instances (Admin Dashboard and Store) in separate servers. Download whole repository and follow instructions:

1. **Admin Dashboard**
```bash
  cd admin 
  npm i
```

Configure your **.env** file with your own keys. (see .env.example)

Setup Prisma

```bash
npx prisma generate
npx prisma db push
npm run dev
```
Your errors from Prisma should be solved, and database connected.

*Server should run on localhost:3000*

2. **Store configuration**
```bash
  cd store
  npm i
```
Create a store, and than copy NEXT_PUBLIC_API_URL from Settings page.
Now create **.env** file located in store folder with proper data. (see .env.example)

```bash
npm run dev
```
Now both server and store should be connected properly.

*(!) If you are using Stripe webhook with local environment use local client for proper results.*

## Screenshots

![Admin dashboard](https://github.com/user-attachments/assets/d785364c-4fe9-4994-9ed4-9cd2b102f5dc)
![Admin dashboard Dark](https://github.com/user-attachments/assets/0c54e349-26d6-415d-a64a-dc5fb5a304f4)
![Store](https://github.com/user-attachments/assets/889e4eab-8d6b-4f22-b0a2-f22cd14703a2)
![Product](https://github.com/user-attachments/assets/b590ea0f-49ee-466c-a16d-f3b54ba56114)
![Cart](https://github.com/user-attachments/assets/caa7de93-0546-456a-8926-bdd1c0a8ba8b)

## Credits

This project was built using [CodeWithAntonio](https://github.com/AntonioErdeljac)'s tutorial as a reference.
