import React from "react";

const dummyNotifications = [
  { id: 1, user: "harshdeep", action: "liked your post", time: "2h ago" },
  { id: 2, user: "waheguru_lover", action: "commented: Nice pic!", time: "5h ago" },
  { id: 3, user: "travel_guru", action: "started following you", time: "1d ago" },
  { id: 4, user: "nature_lover", action: "mentioned you in a comment", time: "2d ago" },
];

const Notifications = () => {
  return (
    <div className="bg-transparent">
      <div className="max-w-6xl mx-auto mt-4 px-4">
        {/* Notifications Panel */}
        <main className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">Notifications</h2>

          <div className="bg-white rounded-xl shadow-md overflow-hidden divide-y">
            {dummyNotifications.map((notification) => (
              <div
                key={notification.id}
                className="p-4 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
                    {notification.user.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-gray-800">
                    <span className="font-medium">{notification.user}</span>{" "}
                    {notification.action}
                  </div>
                </div>
                <div className="text-gray-400 text-sm">{notification.time}</div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Notifications;