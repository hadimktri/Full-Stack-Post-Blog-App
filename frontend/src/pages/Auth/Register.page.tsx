import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Anchor,
  createStyles,
} from "@mantine/core";
import { useForm, isEmail, hasLength } from "@mantine/form";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";
import { getGoogleUrl } from "../../utils/getGoogleUrl";
import { FcGoogle } from "react-icons/fc";

interface Ivalues {
  email: string;
  password: string;
  name: string;
  confirmPassword?: string;
  profilePicture: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const { signUpService, authLoading, user } = useBoundStore((state) => state);

  useEffect(() => {
    if (user) {
      navigate("/posts");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  //sets the inital values
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
      profilePicture: "",
    },
    // cheks the validity of entry in the useForm hook
    validate: {
      email: isEmail("Invalid email"),
      password: hasLength(
        { min: 8, max: 20 },
        "Name must be 8-20 characters long"
      ),
      confirmPassword: (value: string, values: Ivalues) =>
        value !== values.password ? "Passwords did not match" : false,
    },
  });

  //check the exsistance of both entry if no stops with return if yes fires the (loginService())
  const onSignUp = (values: Ivalues) => {
    if (
      !values.email ||
      !values.password ||
      !values.confirmPassword ||
      !values.name ||
      values.password !== values.confirmPassword
    )
      return;
    signUpService(
      values.name,
      values.email,
      values.password,
      values.profilePicture
    );
  };

  const useStyles = createStyles(() => ({
    button: {
      display: "flex",
      color: "lightgray",
      borderBottom: "2px solid gray",
      paddingBottom: "5px",
      paddingTop: "5px",
      marginTop: "20px",
      backgroundColor: "transparent",
    },
    
  }));

  const from = ((location.state as any)?.from.pathname as string) || "/profile";
  const { classes } = useStyles();
  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Sign Up!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        have an account?
        <Link to={"/login"}>Sign In</Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit((values) => onSignUp(values))}>
          <TextInput
            label="Name"
            placeholder="Your Name"
            required
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps("password")}
          />
          <TextInput
            label="Confirm password"
            placeholder="Your password"
            required
            {...form.getInputProps("confirmPassword")}
          />
          <TextInput
            label="Profile Picture"
            placeholder="Profile Picture"
            {...form.getInputProps("profilePicture")}
          />
          <Button fullWidth mt="xl" type="submit">
            Sign UpProfilePicture
          </Button>
          <Anchor href={getGoogleUrl(from)} className={classes.button}>
            <FcGoogle size={25} />
            <Text ml="sm">or Sign Up with Google</Text>
          </Anchor>
          {authLoading ? <h2>Loading...</h2> : null}
        </form>
      </Paper>
    </Container>
  );
}
