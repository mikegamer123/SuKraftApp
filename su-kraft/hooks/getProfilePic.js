import Person0 from "../assets/People/Person0.png";
import Person1 from "../assets/People/Person1.png";
import Person2 from "../assets/People/Person2.png";
import Person3 from "../assets/People/Person3.png";
import Person4 from "../assets/People/Person4.png";
import Person5 from "../assets/People/Person5.png";
import Person6 from "../assets/People/Person6.png";
import Person7 from "../assets/People/Person7.png";

export const getProfilePic = (user) => {
    if (user?.image){
        return {uri: user?.image}
    }

    const switcher = user?.id % 7;
    switch (switcher) {
        case 0:
            return (Person0);
        case 1:
            return (Person1);
        case 2:
            return (Person2);
        case 3:
            return (Person3);
        case 4:
            return (Person4);
        case 5:
            return (Person5);
        case 6:
            return (Person6);
        case 7:
            return (Person7);
        default:
            return (Person7);
    }
}