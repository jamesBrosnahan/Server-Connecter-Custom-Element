class ServerConnecter extends HTMLElement{
  constructor(){
    super();
    this.defaultHost = "127.0.0.1";
    this.defaultPort = 6600;
    this.defaultRefreshRate = 5;
    this.defaultSync = true;
    
    this.defaultInputConfig = [
      {id: 'Host', text : 'Host : ', type : 'text', placeholder : this.defaultHost, value : ''},
      {id : 'Port' ,text : 'Port : ', type : 'text', placeholder : this.defaultPort, value : ''},
      {id : 'RefreshRate', text : 'Refresh (sec):', type : 'number', placeholder : this.defaultRefreshRate, value : ''},
      {id : 'Sync', text : 'Sync : ', type : 'checkbox', placeholder : this.defaultSync, value : ''}
    ];
    //"\u2610" checkbox unicode
    this.inputContainers = this.defaultInputConfig.map((config) => this.inputContainer(config.id, config.text, config.type, config.placeholder));

    let container = document.createElement('div');
    container.classList.add('container');
  
    for(let i = 0; i < this.inputContainers.length; i++){
      container.appendChild(this.inputContainers[i]);
    }
    
    let connectContainer = document.createElement('div');
    connectContainer.classList.add('buttonContainer');
    this.connectButton = document.createElement('button');
    this.connectButton.innerText = 'Connect';
    connectContainer.appendChild(this.connectButton);
    
    container.appendChild(connectContainer);
    
    let shadowRoot = this.attachShadow({mode : 'open'});
    shadowRoot.innerHTML = '<link rel="stylesheet" type="text/css" href="./ServerConnecter/ServerConnecter.css">';
    shadowRoot.appendChild(container);
    
    this.hostInput = shadowRoot.querySelector('#Host');
    this.portInput = shadowRoot.querySelector('#Port');
    this.refreshRateInput = shadowRoot.querySelector('#RefreshRate');
    this.syncInput = shadowRoot.querySelector('#Sync');
  }

  inputContainer(id, labelText, inputType, inputDefault){
    let Container = document.createElement('div');
    Container.classList.add('inputContainer');
    let Label = document.createElement('label');
    Label.innerText = labelText;
    let Input = document.createElement('input');
    Input.id = id;
    Input.type = inputType;
    if(inputType == 'checkbox'){
      Input.checked = inputDefault;
    }else{
      Input.placeholder = inputDefault;
    }
    Container.appendChild(Label);
    Container.appendChild(Input);
    return Container;
  }
  connect(event){
    this.host = this.hostInput.value;
    this.port = this.portInput.value;
    this.refreshRate = this.refreshRateInput.value;
    this.sync = this.syncInput.checked;
    this.dispatchEvent(new CustomEvent('connect',{detail : {host : this.host, port : this.port, refreshRate : this.refreshRate,sync : this.sync}}));
  }
  connectedCallback(){
    this.connectButton.addEventListener('click', event => this.connect(event));
  }
  disconnectedCallback(){
    super.disconnectedCallback();
  }
  get host(){
    if(this.hasAttribute('host')){
      return this.getAttribute('host');
    }else{
      return '127.0.0.1';
    }
  }
  set host(value){
    if(value){
      this.setAttribute('host', value);
    }else{
      this.removeAttribute('host');
    }
    //this.updateHostInput
  }
  get port(){
    if(this.hasAttribute('port')){
      return this.getAttribute('port');
    }else{
      return 6600;
    }
  }
  set port(value){
    if(value){
      this.setAttribute('port', value);
    }else{
      this.removeAttribute('port');
    }
    //this.updatePortInput
  }
  get refreshRate(){
    if(this.hasAttribute('refresh-rate')){
      return this.getAttribute('refresh-rate');
    }else{
      return 5;
    }
  }
  set refreshRate(value){
    if(value){
      this.setAttribute('refresh-rate', value);
    }else{
      this.removeAttribute('refresh-rate');
    }
    //this.updateRefreshRateInput
  }
  get sync(){
    if(this.hasAttribute('sync')){
      return this.getAttribute('sync');
    }else{
      return false;
    }
  }
  set sync(value){
    if(value){
      this.setAttribute('sync', value)
    }else{
      this.removeAttribute('sync');
    }
    //this.updateRefreshRateInput
  }
}

customElements.define('server-connecter', ServerConnecter);