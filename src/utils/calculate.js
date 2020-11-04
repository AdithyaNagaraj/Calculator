export default (expression) => {

    const matched = (new RegExp('([\\d]+\\.?[\\d]*)?([-+/*][\\d]+\\.?[\\d]*)*')).exec(expression)
    //const matched = (new RegExp('^[-+]?[0-9]+([-+*/]+[-+]?[0-9]+)*$')).exec(expression)
    
    if (!matched) {
      return 0;
    }
    const signs = (new RegExp(/^[*+-\/]{2}/)).exec(expression);
    if (signs){
      return 0;
    }
  
    return new Function(`return ${matched[0]}`)()
  }