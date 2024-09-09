setTimeout(generate, 1000);

function generate() {
  var dlbtn = document.getElementById("dlbtn");
  var uuidd = document.getElementById("uuid");
  var user = "testuser";
  var userID = createUuid();
  uuidd.innerHTML = userID;
  
  var content1 = `<?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
  <plist version="1.0">
  <dict>
    <key>PayloadContent</key>
    <array>
      <dict>
        <key>PayloadType</key>
        <string>com.apple.configuration.profile</string>
        <key>PayloadVersion</key>
        <integer>1</integer>
        <key>PayloadIdentifier</key>
        <string>jp.haruharutv.drmsystem</string>
        <key>PayloadUUID</key>
        <string>${createUuid()}</string>
        <key>PayloadDisplayName</key>
        <string>DRM設定(${user} by ${userID})</string>
        <key>PayloadDescription</key>
        <string>「はるはるTV」等の表示に必要な著作権要件を満たすためのプロファイルです。うまく動作しない場合はこちらのサポートをご覧ください。</string>
        <key>PayloadContent</key>
        <array>
          <dict>
            <key>PayloadType</key>
            <string>com.apple.applicationaccess</string>
            <key>PayloadVersion</key>
            <integer>1</integer>
            <key>PayloadIdentifier</key>
            <string>jp.haruharutv.screencapture</string>
            <key>PayloadUUID</key>
            <string>${createUuid()}</string>
            <key>PayloadDisplayName</key>
            <string>Application Settings</string>
            <key>PayloadContent</key>
            <dict>
              <key>allowScreenShot</key>
              <false/>
            </dict>
          </dict>
        </array>
      </dict>
    </array>
    <key>PayloadDisplayName</key>
    <string>DRM設定</string>
    <key>PayloadIdentifier</key>
    <string>jp.haruharutv.drmsystem</string>
    <key>PayloadRemovalDisallowed</key>
    <false/>
    <key>PayloadScope</key>
    <string>System</string>
    <key>PayloadType</key>
    <string>Configuration</string>
    <key>PayloadUUID</key>
    <string>${createUuid()}</string>
    <key>PayloadVersion</key>
    <integer>1</integer>
  </dict>
  </plist>`;
  
  const blob = new Blob([content1], { type: "application/x-apple-aspen-config" });
  const blobURL = URL.createObjectURL(blob);
  dlbtn.download = "drm_settings.mobileconfig";
  dlbtn.setAttribute("href", blobURL);
  console.log("Success!");
}

function createUuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(a) {
    let r = (new Date().getTime() + Math.random() * 16) % 16 | 0;
    let v = a == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
