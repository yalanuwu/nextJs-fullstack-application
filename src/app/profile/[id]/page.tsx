export default function UserProfile({params} : any) {
    return (
      <div>
          <h1>Profile Page</h1>
          <p>This is the profile page.</p>
          <span className="text-2xl ">{params.id}</span>
      </div>
    );
  }