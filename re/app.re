open BsReactNative;

let styles =
StyleSheet.create(
  Style.({
    "container": 
      style([
        flex(1.), 
        backgroundColor("#F5FCFF"),
        justifyContent(Center),
        alignItems(Center)
      ]),
    "welcome":
      style([
        fontSize(Float(20.)), 
        textAlign(Center), 
        margin(Pt(10.))
      ]),
    "instructions":
      style([
        textAlign(Center),
        marginBottom(Pt(5.))
      ])
    })
);

let iOSInstructions:string = "Press Cmd+R to reload \n Cmd+D or shake for dev menu";
let androidInstructions:string = "Double tap R on your keyboard to reload,\n Shake or press menu button for dev menu";

let instructions = 
Platform.os === Platform.IOS ?
  iOSInstructions : androidInstructions;
let app = () =>
  <View style=styles##container>
    <Text style=styles##welcome value="Welcome to Pride London!" />
    <Text style=styles##instructions value="To get started, edit App.js" />
    <Text style=styles##instructions value=instructions />
  </View>;
