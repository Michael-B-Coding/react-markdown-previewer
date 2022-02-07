// functional components
const Header = (props) => {
    return <h1>{props.text}</h1>
  }
  
  const VerticalSpacer = (props) => {
    return <div style={{marginTop: "7.5px", marginBottom: "7.5px"}}></div>
  }
  
  // Class Components
  class InputEditor extends React.Component {
    constructor(props){
      super(props);
    }
    
    render(){
      
      let styles = {
        width: "50%",
        minHeight: "100px",
        maxHeight: "200px",
        overflowY: "auto"
      };
      
      Object.assign(styles, ...this.props.themes);
      
      return (
        <div>
          <h2 className="d-flex align-items-center justify-content-center">Enter your Input:</h2>
          <div className="d-flex align-items-center justify-content-center">
            <textarea id="editor" style={styles} onChange={this.props.handleInput}>{this.props.input}</textarea>
          </div>
        </div>
       )
    };
  }
  InputEditor.defaultProps = {
    themes: [{}]
  };
  
  class PreviewDisplay extends React.Component {
    constructor(props){
      super(props);
    }
    
    createMarkup = () => {
      return {
        __html: marked.parse(this.props.text)
      };
    }
    
    render(){
      let styles = {
        textAlign: "left",
        width: "50%",
        minHeight: "200px",
        maxHeight: "600px",
        overflowY: "auto"
      };
      
      Object.assign(styles, ...this.props.themes);
      
      return (
        <div>
          <h2 className="d-flex align-items-center justify-content-center">View your Markdown:</h2>
          <div className="d-flex align-items-center justify-content-center">
            <div id="preview" style={styles} dangerouslySetInnerHTML={ this.createMarkup() }></div>
          </div>
        </div>
      )
    };
  }
  PreviewDisplay.defaultProps = {
    themes: [{}]
  };
  
  // App
  class MarkDownApp extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        input: 
        '# h1 Heading\n\n'+
        '## h2 Heading\n\n' +
        '__[Link](https://www.google.com)__\n\n' +
        'This is `inline code`\n\n'+
        '```\nBlock code\n```\n\n'+
        '- list item 1\n- list item 2\n\n'+
        '> Blockquote...\n\n'+
        '![Minion](https://octodex.github.com/images/minion.png)\n\n'+
        '**bolded text**'
      };
  
      this.handleInput = this.handleInput.bind(this);
    }
    
    handleInput = (event) => {
      //event.target.value
      this.setState({
        input: event.target.value
      });
    }
    
    render() {
      
      let theme = {
        colorPallet: {
          colorLevel1: "#006666", // darkest
          colorLevel2: "#66b2b2",
          colorLevel3: "#b2d8d8", // lightest
        },
        apply: {}
      };
      theme.apply.roundBox = {
        backgroundColor: theme.colorPallet.colorLevel2,
        boxShadow: "0px 0px 15px " + theme.colorPallet.colorLevel3,
        border: "2px solid black",
        borderRadius: "5px",
      }
      
      let styles = {
        textAlign: "center",
        background: theme.colorPallet.colorLevel1,
        width: "100vw",
        height: "100vh"
      };
      
      return (
        <div style={styles} className="container-fluid">
          <Header text="React Markdown Previewer"/>
          <InputEditor 
            handleInput={this.handleInput}
            input={this.state.input}
            themes={[theme.apply.roundBox]}/>
          <VerticalSpacer />
          <PreviewDisplay
            text={this.state.input}
            themes={[theme.apply.roundBox]}/>
        </div>
      )
    }
  }
  ReactDOM.render(
    <MarkDownApp />,
    document.getElementById('ReactApp')
  );