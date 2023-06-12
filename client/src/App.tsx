import * as React from "react";

export default function App() {
    console.log(process.env.REACT_APP_SERVICE_API);
    React.useEffect(() => {
        let watchID = window.navigator.geolocation.watchPosition(console.log);

        return () => {
            window.navigator.geolocation.clearWatch(watchID);
        };
    }, []);

    return <div>App</div>;
}
