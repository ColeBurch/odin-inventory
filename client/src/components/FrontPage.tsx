import React from "react";

const FrontPage = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Ecommerce Inventory Manager
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Manage your inventory with ease.
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/odin-inventory-a3085.appspot.com/o/hatImage-min.jpg?alt=media&token=d7bd0796-c3f7-42c9-ab04-67b7060cc72c"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/odin-inventory-a3085.appspot.com/o/pantsImage-min.jpg?alt=media&token=1724e4f5-9e61-4226-8391-ae3f8bb7f1c3"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/odin-inventory-a3085.appspot.com/o/Jacket-Image.jpg?alt=media&token=e3b020dc-ede1-428d-8872-def1de5654e4"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/odin-inventory-a3085.appspot.com/o/shoeImage-min.jpg?alt=media&token=e4dfe1f0-7810-460f-8f30-1bd4a3667616"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/odin-inventory-a3085.appspot.com/o/shirtImage-min.jpg?alt=media&token=bdfad1e9-b3a9-46db-89a9-08a709b74dbe"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/odin-inventory-a3085.appspot.com/o/watchImage-min.jpg?alt=media&token=aff1551d-c82d-4fbe-8ec2-a38f1e99b403"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/odin-inventory-a3085.appspot.com/o/Jean-Jacket-Image.jpg?alt=media&token=df472a59-5518-4f04-b9b1-ea8a6c47fb0e"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="/inventory"
                className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
              >
                See the inventory
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
