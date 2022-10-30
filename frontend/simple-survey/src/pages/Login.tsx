import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";
import Button from "../components/Button";
import Container from "../components/Container";

const Login: React.FC = () => {

	function handleLoginResponse(response : any) {
		console.log(response.credential)
		console.log(jwt_decode(response.credential))
	}

	useEffect(() => {
		// @ts-ignore
		google.accounts.id.initialize({
			client_id: "502580724225-j05b06b81p3rfk626ino46dqgor4rofm.apps.googleusercontent.com",
			callback: handleLoginResponse
		});
		// @ts-ignore
		google.accounts.id.renderButton(
			document.getElementById("googleLogin"),
			{theme: "outline", size: "large"}
		);
	}, [])

	return (
		<Container className="bg-primary w-screen h-screen">
			<div className="flex flex-col gap-y-4 bg-body-text w-[678px] h-[760px] rounded-2xl py-[74px] px-[54px]">
				<div className="flex flex-col gap-y-2">
					<div className="text-center font-extrabold text-5xl">
						Welcome back!
					</div>
					<div className="text-center font-normal text-xl">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					</div>
				</div>

				<div>
					<form className="flex flex-col gap-y-4">
						<div className="flex flex-col">
							<label className="font-normal text-base text-light-gray">E-mail</label>
							<input className="outline outline-1 outline-light-gray rounded-2xl h-14 px-4 py-4" id="e-mail" type="email" placeholder="Enter your e-mail"></input>
						</div>
						<div className="flex flex-col">
							<label className="font-normal text-base text-light-gray">Password</label>
							<input className="outline outline-1 outline-light-gray rounded-2xl h-14 px-4 py-4" id="password" type="password" placeholder="**************"></input>
							<div className="flex flex-row justify-end">
								<p className="text-right text-light-gray cursor-pointer hover:underline mt-2">
									Forgot password?
								</p>
							</div>
						</div>
					</form>
				</div>

				<Button className="bg-primary text-body-text h-[56px] font-semibold text-xl" onClick={() => console.log('clicked login')}>
					Sign In
				</Button>
				<Button className="bg-secondary text-body-text h-[56px] font-semibold text-xl" onClick={() => console.log('clicked create account')}>
					Create New Account
				</Button>

				<div className="flex flex-row w-full justify-center my-5">
					<div>
						<div className="w-56 h-2/4 border-solid border-b border-light-gray">

						</div>
					</div>
					<div className="px-8 text-light-gray">
						or
					</div>
					<div>
						<div className="w-56 h-2/4 border-solid border-b border-light-gray">
		
						</div>
					</div>
				</div>
				<div id="googleLogin">

				</div>

			</div>
		</Container>
  );
}

export default Login;