import { Tab } from "@headlessui/react";

const Plan = () => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const Tabs = [
    {
      id: 1,
      title: "Free",
      description: "A time limited demo of our servers.",
      disabled: false,
    },
    {
      id: 2,
      title: "Gaming",
      description: "Faster processors optimized for gaming.",
      disabled: false,
    },
  ];

  const TabData = [
    {
      id: 1,
      ram: 6,
      cores: 3,
      disk: 60,
      price: 20,
    },
    {
      id: 2,
      ram: 12,
      cores: 3,
      disk: 120,
      price: 40,
    },
  ];

  return (
    <>
      <Tab.Group>
        <div className="my-2">
          <h1 className="text-2xl">Select Plan</h1>
          <p className="text-gray-400">
            All plans comes with our custom control panel, NVMe disks, an ubuntu
            root shell and much more.
          </p>
        </div>
        <Tab.List className={"flex sm:flex-row flex-col items-center gap-2"}>
          {Object.values(Tabs).map((tab) => {
            return (
              <Tab
                key={tab.id}
                disabled={tab.disabled}
                className={({ selected }) =>
                  classNames(
                    "w-full text-start p-4 rounded-lg  text-sm font-medium leading-5",
                    " ring-blue-400 focus:outline-none focus:ring-2",
                    selected
                      ? "bg-black text-whiet shadow border border-blue-500"
                      : "text-blue-100 border hover:bg-white/[0.12] hover:text-white"
                  )
                }
              >
                <h5 className="text-lg">{tab.title}</h5>
                <p className="text-xs">{tab.description}</p>
              </Tab>
            );
          })}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div className="p-2">
              <div className="my-2">
                <h1 className="capitalize text-lg">Free Offers</h1>
                <p className="text-gray-400">
                  Select a service for our currently available free offers.
                </p>
              </div>
              <div className="flex items-center gap-4 border border-blue-500 p-4 rounded-xl bg-black">
                <img
                  className="rounded-full"
                  src="./minecraft.svg"
                  alt="minecraft"
                />
                <div>
                  <h5>Minecraft</h5>
                  <p>Vanilla 1.20.4</p>
                </div>
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="p-2">
              <div className="my-2">
                <h1 className="capitalize text-xl">Select Size</h1>
                <p className="text-gray-400">
                  Some services require more memory to run.
                </p>
              </div>
              <div className="flex items-center sm:flex-row flex-col gap-2">
                {Object.values(TabData).map((val) => {
                  return (
                    <div
                      key={val.id}
                      className="w-full border border-blue-500 p-4 rounded-xl bg-black"
                    >
                      <h5>{val.ram} GB</h5>
                      <p>
                        {val.cores} Cores . {val.disk} GB Disk
                      </p>
                      <h5>${val.price} / mo</h5>
                    </div>
                  );
                })}
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
};

export default Plan;
