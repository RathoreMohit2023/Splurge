// import React, { useContext } from 'react';
// import { View, TouchableOpacity, Text } from 'react-native';
// import { WebView } from 'react-native-webview';
// import { ThemeContext } from "../components/ThemeContext";
// import DashedLoader from './DashedLoader';
// import { X } from "lucide-react-native";

// const PDFViewer = ({ route, navigation }) => {
//   const { colors } = useContext(ThemeContext);
//   const { url } = route.params;

//   return (
//     <View style={{ flex: 1 }}>
      
//       {/* Close Button */}
//       <TouchableOpacity
//         onPress={() => navigation.goBack()}
//         style={{
//           position: "absolute",
//           top: 20       ,
//           right: 20,
//           zIndex: 999,
//           backgroundColor: colors.card,
//           padding: 8,
//           borderRadius: 50,
//           elevation: 5,
//           shadowColor: "#000",
//           shadowOpacity: 0.2,
//           shadowRadius: 3,
//           shadowOffset: { width: 0, height: 2 }
//         }}
//       >
//         <X size={22} color={colors.textPrimary} />
//       </TouchableOpacity>

//       <WebView
//         source={{ uri: url }}
//         startInLoadingState={true}
//         renderLoading={() => (
//           <DashedLoader color={colors.primary} size={100} />
//         )}
//       />
//     </View>
//   );
// };

// export default PDFViewer;

import React, { useContext } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { ThemeContext } from "../components/ThemeContext";
import DashedLoader from './DashedLoader';
import { ArrowLeft } from "lucide-react-native";

const PDFViewer = ({ route, navigation }) => {
  const { colors } = useContext(ThemeContext);
  const { url, title } = route.params;

  // Detect DOC / DOCX
  const isWord =
    url?.toLowerCase().endsWith(".doc") ||
    url?.toLowerCase().endsWith(".docx");

  // Office viewer URL
  const officeUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(url)}`;

  const finalUrl = isWord ? officeUrl : url;

  // 🪄 Inject CSS to hide Office header completely
  const hideOfficeHeader = `
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = \`
    /* Hide office viewer bars */
    .waffle-header,
    #WACRibbonContainer,
    #office-bar,
    .OfficeHeader,
    .top-bar,
    .CommandBar,
    .AppHeader,
    .ow-topBar,
    .office-header {
      display: none !important;
      height: 0 !important;
      visibility: hidden !important;
      opacity: 0 !important;
    }

    body, html {
      margin: 0 !important;
      padding: 0 !important;
    }
  \`;
  document.head.appendChild(style);
`;
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>

      {/* ----------- HEADER BAR ----------- */}
      <View
        style={{
          height: 80,
          backgroundColor: colors.card,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          elevation: 8,
          shadowColor: "#000",
          shadowOpacity: 0.1,  
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
          zIndex: 1000,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ padding: 5 }}
        >
          <ArrowLeft size={26} color={colors.text} />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: colors.text,
            marginLeft: 15
          }}
        >
          {isWord ? "Document Viewer" : "PDF Viewer"}
        </Text>
      </View>

      {/* ----------- VIEWER CONTENT ---------- */}
      <WebView
        style={{ flex: 1, marginTop: 5 }}
        source={{ uri: finalUrl }}
        startInLoadingState={true}
        injectedJavaScript={isWord ? hideOfficeHeader : ""}
        onMessage={() => {}}
        renderLoading={() => (
          <DashedLoader color={colors.primary} size={100} />
        )}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
};

export default PDFViewer;
