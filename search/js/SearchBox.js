class SearchBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = { fixed: false };
  }

  componentDidMount() {
    this.setPosition = this.setPosition.bind(this);
    window.addEventListener('scroll', this.setPosition);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.setPosition);
  }  

  render() {
    return <SearchBoxView fixed={this.state.fixed} />
  }

  isFixed() {
    return document.querySelector('.search-box').getBoundingClientRect().top <= 0 ;
  }

  setPosition() {
    this.setState({ fixed: this.isFixed() });
  }
}
