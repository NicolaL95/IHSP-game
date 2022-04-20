function gravityMagnitude() {
    const MAGNITUDE = 20
    let yCurrent = this.state.yAxis - MAGNITUDE
    this.setState({
        yAxis: yCurrent
    })
}


export { gravityMagnitude }