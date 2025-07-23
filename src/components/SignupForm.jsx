 // SignupForm.jsx
import { useState,useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styling/SignupForm.css'; // Import your CSS for styling

export default function SignupForm() {
  const [form, setForm] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    country: '',
    dob: '',
    referredBy: '',
    password: '',
    firstName: '',
    lastName: ''
  }); // 
  const navigate = useNavigate();

  // Extract referral code from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get('ref');
    if (refCode) {
      setForm(prev => ({ ...prev, referredBy: refCode }));
    }
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('https://bitvest-server-dmlk.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      alert(data.message);
    } catch (err) {
      alert(err.message);
    }

    navigate('/verify-otp', { state: { email: form.email } });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <p className="title">Create account</p>
      <p className="message">Signup into Bit~Vestor now and enjoy the premium Luxury of investment.</p>

      <div className="flex">
        <label htmlFor="">
           <input className='input' name="firstName" placeholder="" onChange={handleChange} required />
          <span>First name</span>
       </label>
       <label htmlFor="">
           <input className='input' name="lastName" placeholder="" onChange={handleChange} required />
          <span>Last name</span>
       </label>
     </div>
     
      <label htmlFor="">
      <input className='input' name="username" placeholder="" onChange={handleChange} required />
      <span>User name</span>
      </label>

      <label htmlFor="">
      <input className='input' name="email" type="email" placeholder="" onChange={handleChange} required />
      <span>Email</span>
      </label>
      
      <label htmlFor="">
      <input className='input' name="phone" placeholder="" onChange={handleChange} required />
      <span>Phone number</span>
      </label>

       <label>
      <input className='input' name="password" type="password" placeholder="" onChange={handleChange} required />
      <span>Create Password</span>
      </label>

      <label htmlFor="">
      <select className='input' name="country" onChange={handleChange} required>
        <option value=""></option>
        <option value="South Africa">South Africa</option>
      </select>
      <span>select country</span>
      </label>

      <label>
      <input className='input' name="dob" type="date" onChange={handleChange} required />
      <span>Date of Birth</span>
      </label>

      <label>
      <input className='input' name="referredBy" type="text" 
      value={form.referredBy} placeholder="" onChange={handleChange} />
      <span>referral Code</span>
      </label>

      <button className="submit" type="submit">Register</button>
      <p class="signin">Already have an account ? <Link to="/login">Log in</Link></p>
    </form>
    

  );
}