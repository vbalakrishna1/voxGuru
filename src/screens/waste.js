<View style={{ flex: 0.8, flexDirection: 'column' }}>
   <View
      style={{
         justifyContent: 'space-between',
         flexWrap: 'nowrap',
         flexDirection: 'row',
         paddingTop: 10,
      }}>
      <TouchableHighlight onPress={() => this.onResetPassword()}
      >
         <Text>Forgot Password? </Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => this.onCreateAccount()}
      >
         <Text>New User? Sign Up </Text>
      </TouchableHighlight>
   </View>
</View>
   <View
      style={{
         flex: 0.2,
         flexDirection: 'column',
         paddingBottom: 20,

      }}>
      <TouchableOpacity onPress={() => console.log("login")}
         style={{ width: "100%", height: 20, backgroundColor: "purple" }}
      >
         {/* this.onLogin(this.state.email , this.state.password) */}
         <Text
            style={{
               color: '#ffbc00',
            }}> Login </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log("Terms")}>
         {/* this.props.navigation.navigate('TermsStack') */}
         <View
            style={{
               borderTopWidth: 1,
               borderTopColor: "#222222"
            }}>
            <Text
               style={{
                  color: 'grey',
                  textAlign: "center"
               }}>  Terms & Conditions </Text>
         </View>
      </TouchableOpacity>
   </View>