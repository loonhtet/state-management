import { DeleteButton } from "../ui/Button";

const TeamList = () => {
    const teams = [
      { id: 1, name: 'Inter Miami', city: 'Miami', country: 'USA' },
      { id: 2, name: 'Al Nassr', city: 'Riyadh', country: 'Saudi Arabia' },
      { id: 3, name: 'Man City', city: 'Manchester', country: 'England' },
      { id: 4, name: 'Liverpool', city: 'Liverpool', country: 'England' },
    ];
  
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-navy">Team List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <div
              key={team.id}
              className="bg-navy text-cream border-4 border-salmon space-y-4 p-6 transition duration-300"
            >
              <h2 className="text-xl font-bold">{team.name}</h2>
              <p className="text-sm"><span className="font-semibold">City:</span> {team.city}</p>
              <p className="text-sm"><span className="font-semibold">Country:</span> {team.country}</p>
              <DeleteButton />
            </div>
          ))}
          <div className="cursor-pointer grid place-content-center bg-teal text-navy border-4 border-sand space-y-4 p-6 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#F2CC8F" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#F2CC8F" className="size-16">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
        </div>
      </div>
    );
  };
  
  export default TeamList;
  