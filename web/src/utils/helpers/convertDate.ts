const convertDate = (date: string) => {
  const orderDate = new Date(date); // replace this with your actual date
  const formattedDate = orderDate.toLocaleDateString('en-GB');
  return formattedDate;
};

export default convertDate;