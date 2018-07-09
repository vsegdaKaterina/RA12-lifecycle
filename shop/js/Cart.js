class Cart extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.isOpen !== this.props.isOpen || (nextProps.isOpen && nextProps.items.length !== 0));
  }

  render() {
    return (
      <CartView {...this.props} />
    );
  }

}
