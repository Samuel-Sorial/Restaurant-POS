const printInvoice = (id) => {
  fetch(`http://` + window.location.host + `/invoice-${id}`, {
    method: 'GET',
  });
};

const deleteInvoice = (id) => {
  fetch(`http://` + window.location.host + `/invoice-${id}`, {
    method: 'DELETE',
  }).then((res) => location.reload());
};
