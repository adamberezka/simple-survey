import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";
import { setUser } from "../redux/User/user.actions";
import { loginUser } from "../services/BackendService";

const Login: React.FC<{userLoggedIn: boolean}> = ({
	userLoggedIn
}) => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();
	console.log(location);

	function handleLoginResponse(googleResponse: {credential: string}) {
		loginUser(googleResponse.credential).then( (apiResponse) => {
			console.log(apiResponse)
				if(apiResponse.status === 200) {
					const userData = {
						jwt: googleResponse.credential, 
						email: apiResponse.data.email,
						username: apiResponse.data.username,
						imageUrl: apiResponse.data.imageUrl,
						id: apiResponse.data.userId,
						isAdmin: apiResponse.data.isAdmin
					};

					localStorage.setItem('userData', JSON.stringify(userData));

					dispatch(setUser(userData));

					if (location.state && location.state.redirectToSurvey && location.state.surveyHash) {
						navigate(`/surveys/${location.state.surveyHash}`);
					} else {
						navigate("/surveys");
					}
				} else {
					navigate("/login");
				}
		});
	}

	useEffect(() => {
		if (userLoggedIn) {
			navigate("/surveys");
		}
		// @ts-ignore
		google.accounts.id.initialize({
			client_id: "502580724225-j05b06b81p3rfk626ino46dqgor4rofm.apps.googleusercontent.com",
			callback: handleLoginResponse,
			ux_mode: "popup"
		});
		// @ts-ignore
		google.accounts.id.renderButton(
			document.getElementById("googleLogin"),
			{theme: "outline", size: "large", width: "240"}
		);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
				<div className="flex justify-around">
					<div className="w-60" id="googleLogin">

					</div>
					<Button className="border-[#d8d8d8] border w-60 rounded-md" onClick={() => console.log('clicked Continue with Facebook')}>
						Continue with Facebook
					</Button>
				</div>
			</div>
		</Container>
  );
}

export default Login;