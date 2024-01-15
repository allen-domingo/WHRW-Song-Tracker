function SelfDestruct() {
  const click = () => {
    alert("self destruct");
  };

  return (
    <div className="container justify-center flex">
      <button onClick={click} className="mb-6 place-self-center rounded-md hover:bg-gray-700 transition-all hover:text-white border-2 border-gray-700 p-2">
        Self Destruct
      </button>
    </div>
  );
}
export default SelfDestruct;
