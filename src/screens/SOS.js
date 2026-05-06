import React, {
  useState,
  useEffect
} from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import L from "leaflet";

function SOS({ darkMode }) {

  const [location, setLocation] =
    useState(null);

  const [alertSent, setAlertSent] =
    useState(false);

  const [countdown, setCountdown] =
    useState(null);

  const [fakeCall, setFakeCall] =
    useState(false);

  const [tracking, setTracking] =
    useState(false);

  // FIX LEAFLET ICONS
  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",

    iconUrl:
      "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",

    shadowUrl:
      "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png"
  });

  // HOSPITALS
  const hospitalLocations = [

    {
      name: "City Hospital",
      lat: 12.9716,
      lng: 77.5946
    },

    {
      name:
        "Emergency Care Center",
      lat: 12.975,
      lng: 77.599
    },

    {
      name:
        "Apollo Emergency",
      lat: 12.978,
      lng: 77.602
    }

  ];

  // POLICE STATIONS
  const policeLocations = [

    {
      name:
        "Central Police Station",
      lat: 12.969,
      lng: 77.592
    },

    {
      name:
        "Community Police Help",
      lat: 12.973,
      lng: 77.597
    },

    {
      name:
        "Women Safety Police",
      lat: 12.967,
      lng: 77.601
    }

  ];

  // LIVE TRACKING
  useEffect(() => {

    let watchId;

    if (tracking) {

      watchId =
        navigator.geolocation.watchPosition(
          (position) => {

            setLocation({

              latitude:
                position.coords.latitude,

              longitude:
                position.coords.longitude

            });

          }
        );

    }

    return () => {

      if (watchId) {

        navigator.geolocation.clearWatch(
          watchId
        );

      }

    };

  }, [tracking]);

  // COUNTDOWN
  useEffect(() => {

    let timer;

    if (
      countdown > 0
    ) {

      timer = setTimeout(
        () => {

          setCountdown(
            countdown - 1
          );

        },
        1000
      );

    }

    if (
      countdown === 0
    ) {

      getLocation();

    }

    return () =>
      clearTimeout(timer);

  }, [countdown]);

  // GET LOCATION
  const getLocation = () => {

    if (
      navigator.geolocation
    ) {

      navigator.geolocation.getCurrentPosition(
        (position) => {

          const coords = {

            latitude:
              position.coords.latitude,

            longitude:
              position.coords.longitude

          };

          setLocation(coords);

          triggerSOS(coords);

        },

        () => {

          alert(
            "Unable to access location"
          );

        }
      );

    }

  };

  // SOS
  const triggerSOS = (
    coords
  ) => {

    const user =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      );

    setAlertSent(true);

    alert(

`🚨 Emergency Alert Sent

User:
${user?.name || "Unknown"}

Guardian:
${user?.guardianName || "Not Added"}

Contact:
${user?.guardianPhone || "Not Added"}

Live Location Shared Successfully.`

    );

  };

  // START SOS
  const startSOS = () => {

    setCountdown(5);

  };

  // FAKE CALL
  const triggerFakeCall = () => {

    setFakeCall(true);

    setTimeout(() => {

      alert(
        "📞 Incoming call from Guardian..."
      );

    }, 1500);

  };

  // SHARE LOCATION
  const shareLocation = () => {

    if (
      location
    ) {

      const link =

`https://www.google.com/maps?q=${location.latitude},${location.longitude}`;

      navigator.clipboard.writeText(
        link
      );

      alert(
        "Live location copied successfully."
      );

    }

  };

  // OPEN ROUTE
  const openRoute = (
    lat,
    lng
  ) => {

    window.open(

`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`

    );

  };

  return (

    <div
      style={{
        minHeight: "100vh",

        padding: 20,

        background: "transparent",

        fontFamily: "system-ui"
      }}
    >

      {/* HEADER */}
      <div
        style={{
          marginBottom: 30
        }}
      >

        <h1
          style={{
            fontSize: 34,

            color: darkMode
              ? "#ffffff"
              : "#7c3aed",

            marginBottom: 10
          }}
        >
          Emergency Support
        </h1>

        <p
          style={{
            color: darkMode
              ? "#9ca3af"
              : "#6b7280",

            lineHeight: 1.6
          }}
        >
          Live tracking, guardian alerts,
          nearby hospitals and police
          support.
        </p>

      </div>

      {/* MAIN CARD */}
      <div
        style={{
          background:
            "rgba(255,255,255,0.78)",

          backdropFilter:
            "blur(18px)",

          borderRadius: 35,

          padding: 35,

          boxShadow:
            "0 15px 40px rgba(0,0,0,0.08)"
        }}
      >

        {/* STATUS */}
        <div
          style={{
            padding: 18,

            borderRadius: 24,

            background:
              alertSent
                ? "linear-gradient(135deg, #dcfce7, #bbf7d0)"
                : "linear-gradient(135deg, #fee2e2, #fecaca)",

            marginBottom: 25
          }}
        >

          <h3
            style={{
              margin: 0,

              color:
                alertSent
                  ? "#166534"
                  : "#991b1b"
            }}
          >
            {alertSent
              ? "Emergency Alert Sent"
              : "Emergency Mode Ready"}
          </h3>

        </div>

        {/* COUNTDOWN */}
        {countdown > 0 && (

          <div
            style={{
              textAlign: "center",
              marginBottom: 20
            }}
          >

            <h2
              style={{
                color: "#dc2626"
              }}
            >
              Sending Alert in
              {" "}
              {countdown}
            </h2>

          </div>

        )}

        {/* SOS BUTTON */}
        <div
          style={{
            display: "flex",
            justifyContent:
              "center",
            marginTop: 30,
            marginBottom: 40
          }}
        >

          <button
            onClick={startSOS}

            style={{
              width: 170,

              height: 170,

              borderRadius: "50%",

              border: "none",

              background:
                "linear-gradient(135deg, #ef4444, #dc2626)",

              color: "white",

              fontSize: 34,

              fontWeight: "bold",

              cursor: "pointer",

              boxShadow:
                "0 20px 45px rgba(239,68,68,0.45)"
            }}
          >
            SOS
          </button>

        </div>

        {/* MAP */}
        {location && (

          <div
            style={{
              marginBottom: 30,
              borderRadius: 30,
              overflow: "hidden"
            }}
          >

            <MapContainer
              center={[
                location.latitude,
                location.longitude
              ]}

              zoom={14}

              style={{
                height: "400px",
                width: "100%"
              }}
            >

              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* USER */}
              <Marker
                position={[
                  location.latitude,
                  location.longitude
                ]}
              >

                <Popup>
                  Your Live Location
                </Popup>

              </Marker>

              {/* HOSPITALS */}
              {hospitalLocations.map(
                (
                  hospital,
                  index
                ) => (

                  <Marker
                    key={index}

                    position={[
                      hospital.lat,
                      hospital.lng
                    ]}
                  >

                    <Popup>
                      🏥 {hospital.name}
                    </Popup>

                  </Marker>

                )
              )}

              {/* POLICE */}
              {policeLocations.map(
                (
                  police,
                  index
                ) => (

                  <Marker
                    key={index}

                    position={[
                      police.lat,
                      police.lng
                    ]}
                  >

                    <Popup>
                      🚔 {police.name}
                    </Popup>

                  </Marker>

                )
              )}

            </MapContainer>

          </div>

        )}

        {/* ACTION BUTTONS */}
        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",

            gap: 20
          }}
        >

          {/* LIVE TRACKING */}
          <div style={toolCard}>

            <h3>
              Live Tracking
            </h3>

            <p style={toolText}>
              Real-time GPS tracking
              support.
            </p>

            <button
              onClick={() =>
                setTracking(
                  !tracking
                )
              }

              style={toolBtn}
            >
              {tracking
                ? "Stop Tracking"
                : "Start Tracking"}
            </button>

          </div>

          {/* FAKE CALL */}
          <div style={toolCard}>

            <h3>
              Fake Call Safety
            </h3>

            <p style={toolText}>
              Trigger an incoming call.
            </p>

            <button
              onClick={
                triggerFakeCall
              }

              style={toolBtn}
            >
              Trigger Call
            </button>

          </div>

          {/* SHARE LOCATION */}
          <div style={toolCard}>

            <h3>
              Share Location
            </h3>

            <p style={toolText}>
              Copy live location link.
            </p>

            <button
              onClick={
                shareLocation
              }

              style={toolBtn}
            >
              Share
            </button>

          </div>

        </div>

      </div>

      {/* HOSPITALS */}
      <div style={sectionCard}>

        <h2 style={sectionTitle}>
          Nearby Hospitals
        </h2>

        {hospitalLocations.map(
          (
            hospital,
            index
          ) => (

            <div
              key={index}
              style={serviceCard}
            >

              <div>

                <h3>
                  {hospital.name}
                </h3>

                <p
                  style={{
                    color: "gray"
                  }}
                >
                  Emergency Hospital
                </p>

              </div>

              <button
                onClick={() =>
                  openRoute(
                    hospital.lat,
                    hospital.lng
                  )
                }

                style={routeBtn}
              >
                Open Route
              </button>

            </div>

          )
        )}

      </div>

      {/* POLICE */}
      <div style={sectionCard}>

        <h2 style={sectionTitle}>
          Nearby Police Stations
        </h2>

        {policeLocations.map(
          (
            police,
            index
          ) => (

            <div
              key={index}
              style={serviceCard}
            >

              <div>

                <h3>
                  {police.name}
                </h3>

                <p
                  style={{
                    color: "gray"
                  }}
                >
                  Emergency Police Support
                </p>

              </div>

              <button
                onClick={() =>
                  openRoute(
                    police.lat,
                    police.lng
                  )
                }

                style={routeBtn}
              >
                Open Route
              </button>

            </div>

          )
        )}

      </div>

    </div>

  );
}

/* STYLES */

const toolCard = {

  background:
    "linear-gradient(135deg, #ffffff, #f5f3ff)",

  padding: 25,

  borderRadius: 28,

  boxShadow:
    "0 10px 30px rgba(0,0,0,0.06)"
};

const toolText = {

  color: "gray",

  lineHeight: 1.6,

  marginBottom: 15
};

const toolBtn = {

  padding: "12px 20px",

  border: "none",

  borderRadius: 18,

  background:
    "linear-gradient(135deg, #8b5cf6, #ec4899)",

  color: "white",

  fontWeight: "bold",

  cursor: "pointer"
};

const sectionCard = {

  marginTop: 30,

  background:
    "rgba(255,255,255,0.78)",

  backdropFilter:
    "blur(18px)",

  borderRadius: 30,

  padding: 28,

  boxShadow:
    "0 10px 30px rgba(0,0,0,0.06)"
};

const sectionTitle = {

  color: "#7c3aed",

  marginBottom: 20
};

const serviceCard = {

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  padding: 20,

  borderRadius: 22,

  background:
    "linear-gradient(135deg, #ffffff, #f5f3ff)",

  marginBottom: 15
};

const routeBtn = {

  padding: "10px 18px",

  border: "none",

  borderRadius: 18,

  background:
    "linear-gradient(135deg, #ef4444, #dc2626)",

  color: "white",

  cursor: "pointer",

  fontWeight: "bold"
};

export default SOS;